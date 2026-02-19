from flask import Blueprint, request, jsonify
from database import SessionLocal
from models import FollowUp, StatusEnum
from datetime import datetime, date
from sqlalchemy import func

api = Blueprint('api', __name__, url_prefix='/api')

def get_db():
    """Get database session"""
    return SessionLocal()

@api.route('/followups', methods=['GET'])
def get_followups():
    """Get all follow-ups sorted by follow-up date"""
    try:
        db = get_db()
        followups = db.query(FollowUp).order_by(FollowUp.followup_date).all()
        db.close()
        return jsonify([followup.to_dict() for followup in followups]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/followups/stats', methods=['GET'])
def get_stats():
    """Get follow-up statistics"""
    try:
        db = get_db()
        today = date.today()
        
        # Count due today
        due_today = db.query(func.count(FollowUp.id)).filter(
            FollowUp.followup_date == today,
            FollowUp.status == StatusEnum.PENDING
        ).scalar()
        
        # Count upcoming (after today)
        upcoming = db.query(func.count(FollowUp.id)).filter(
            FollowUp.followup_date > today,
            FollowUp.status == StatusEnum.PENDING
        ).scalar()
        
        # Count overdue (before today)
        overdue = db.query(func.count(FollowUp.id)).filter(
            FollowUp.followup_date < today,
            FollowUp.status == StatusEnum.PENDING
        ).scalar()
        
        # Count completed
        completed = db.query(func.count(FollowUp.id)).filter(
            FollowUp.status == StatusEnum.COMPLETED
        ).scalar()
        
        db.close()
        
        return jsonify({
            "due_today": due_today,
            "upcoming": upcoming,
            "overdue": overdue,
            "completed": completed
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/followups', methods=['POST'])
def create_followup():
    """Create a new follow-up"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or 'person_name' not in data or 'context' not in data or 'followup_date' not in data:
            return jsonify({"error": "Missing required fields: person_name, context, followup_date"}), 400
        
        # Parse date
        try:
            followup_date = datetime.strptime(data['followup_date'], '%Y-%m-%d').date()
        except ValueError:
            return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400
        
        # Create new follow-up
        followup = FollowUp(
            person_name=data['person_name'],
            context=data['context'],
            followup_date=followup_date,
            status=StatusEnum.PENDING,
            notes=data.get('notes', None)
        )
        
        db = get_db()
        db.add(followup)
        db.commit()
        db.refresh(followup)
        result = followup.to_dict()
        db.close()
        
        return jsonify(result), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/followups/<int:followup_id>', methods=['PUT'])
def update_followup(followup_id):
    """Update a follow-up"""
    try:
        data = request.get_json()
        db = get_db()
        
        followup = db.query(FollowUp).filter(FollowUp.id == followup_id).first()
        if not followup:
            db.close()
            return jsonify({"error": "Follow-up not found"}), 404
        
        # Update fields if provided
        if 'person_name' in data:
            followup.person_name = data['person_name']
        if 'context' in data:
            followup.context = data['context']
        if 'followup_date' in data:
            try:
                followup.followup_date = datetime.strptime(data['followup_date'], '%Y-%m-%d').date()
            except ValueError:
                db.close()
                return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400
        if 'status' in data:
            try:
                followup.status = StatusEnum(data['status'])
            except ValueError:
                db.close()
                return jsonify({"error": f"Invalid status. Must be 'pending' or 'completed'"}), 400
        if 'notes' in data:
            followup.notes = data['notes']
        
        db.commit()
        db.refresh(followup)
        result = followup.to_dict()
        db.close()
        
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/followups/<int:followup_id>', methods=['DELETE'])
def delete_followup(followup_id):
    """Delete a follow-up"""
    try:
        db = get_db()
        
        followup = db.query(FollowUp).filter(FollowUp.id == followup_id).first()
        if not followup:
            db.close()
            return jsonify({"error": "Follow-up not found"}), 404
        
        db.delete(followup)
        db.commit()
        db.close()
        
        return jsonify({"message": "Follow-up deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({"status": "ok"}), 200
