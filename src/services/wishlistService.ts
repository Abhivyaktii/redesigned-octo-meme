import { supabase } from '../lib/supabase';

export async function addWishlistItem(participantId: string, item: string, url?: string) {
  const { data, error } = await supabase
    .from('wishlists')
    .insert([
      { participant_id: participantId, item, url }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function removeWishlistItem(itemId: string) {
  const { error } = await supabase
    .from('wishlists')
    .delete()
    .eq('id', itemId);

  if (error) throw error;
}

export async function getMyWishlist(participantId: string) {
  const { data, error } = await supabase
    .from('wishlists')
    .select('*')
    .eq('participant_id', participantId);

  if (error) throw error;
  return data;
}