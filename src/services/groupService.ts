import { supabase } from '../lib/supabase';
import { Group, Participant } from '../types';

export async function createGroup(group: Omit<Group, 'id'>) {
  const { data, error } = await supabase
    .from('groups')
    .insert([group])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function addParticipants(groupId: string, emails: string[]) {
  const participants = emails.map(email => ({
    group_id: groupId,
    email,
  }));

  const { data, error } = await supabase
    .from('participants')
    .insert(participants)
    .select();

  if (error) throw error;
  return data;
}

export async function assignSecretSantas(groupId: string) {
  const { data: participants, error } = await supabase
    .from('participants')
    .select('id, email')
    .eq('group_id', groupId);

  if (error) throw error;

  // Shuffle participants for random assignment
  const shuffled = [...participants].sort(() => Math.random() - 0.5);
  const assignments = shuffled.map((participant, index) => ({
    id: participant.id,
    assigned_to_id: shuffled[(index + 1) % shuffled.length].id,
  }));

  const { error: updateError } = await supabase
    .from('participants')
    .upsert(assignments);

  if (updateError) throw updateError;
}

export async function getMyGroups() {
  const { data, error } = await supabase
    .from('groups')
    .select(`
      *,
      participants (
        id,
        email,
        assigned_to_id
      )
    `);

  if (error) throw error;
  return data;
}

export async function getGroupById(id: string) {
  const { data, error } = await supabase
    .from('groups')
    .select(`
      *,
      participants (
        id,
        email,
        assigned_to_id,
        wishlists (*)
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}