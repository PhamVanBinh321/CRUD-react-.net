import React from 'react';
import { Edit, Trash2, User, Phone, Mail, Calendar, Droplets, MapPin } from 'lucide-react';

const StudentCard = ({ student, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 rounded-full p-2">
              <User className="text-blue-600" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{student.fullName}</h3>
              <p className="text-sm text-gray-500">ID: {student.id}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(student)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(student.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-md"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <Phone size={14} />
            <span className="text-sm">{student.mobile || 'Chưa có'}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <Mail size={14} />
            <span className="text-sm">{student.email || 'Chưa có'}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={14} />
            <span className="text-sm">{student.age} tuổi</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <Droplets size={14} />
            <span className="text-sm">Nhóm máu: {student.bloodGroup || 'Chưa có'}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={14} />
            <span className="text-sm">{student.address || 'Chưa có'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;