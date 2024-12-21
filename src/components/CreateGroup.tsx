import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { createGroup, addParticipants } from '../services/groupService';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

export function CreateGroup() {
  const { user } = useAuth();
  const [participants, setParticipants] = useState<string[]>(['']);
  const [groupName, setGroupName] = useState('');
  const [budget, setBudget] = useState('');
  const [exchangeDate, setExchangeDate] = useState('');

  const addParticipant = () => {
    setParticipants([...participants, '']);
  };

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create the group
      const group = await createGroup({
        name: groupName,
        budget: budget ? parseFloat(budget) : null,
        exchange_date: exchangeDate,
        created_by: user!.id
      });

      // Add participants
      await addParticipants(group.id, participants.filter(email => email.trim()));

      toast.success('Group created successfully!');
      
      // Reset form
      setGroupName('');
      setBudget('');
      setExchangeDate('');
      setParticipants(['']);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create group');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6">Create a Secret Santa Group</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Name
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget (Optional)
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Exchange Date
            </label>
            <input
              type="date"
              value={exchangeDate}
              onChange={(e) => setExchangeDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Participants
            </label>
            <div className="space-y-3">
              {participants.map((participant, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="email"
                    value={participant}
                    onChange={(e) => {
                      const newParticipants = [...participants];
                      newParticipants[index] = e.target.value;
                      setParticipants(newParticipants);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter email address"
                    required
                  />
                  {participants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeParticipant(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addParticipant}
              className="mt-3 flex items-center text-red-600 hover:text-red-700"
            >
              <PlusCircle size={20} className="mr-1" />
              Add Participant
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            Create Group
          </button>
        </div>
      </form>
    </div>
  );
}