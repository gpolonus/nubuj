'use server';

import { Purchase } from '@/lib/types'
import { createServerClient } from '@supabase/ssr'
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

export async function postPurchase(purchase: Purchase) {
  const supabase = await createClient();
  const userId = (await supabase.auth.getUser())?.data?.user?.id;
  if (!userId) {
    // TODO: error state;
    return;
  }

  const { error } = await supabase
    .from('Purchases')
    .insert({
      date: purchase.date,
      amount: purchase.amount,
      type: purchase.type,
      note: purchase.note,
      recipient: purchase.recipient,
      user_id: userId
    });

  // TODO: do something with the error

  revalidatePath('/purchases');
  redirect('/purchases');
}

export async function updatePurchase(purchase: Purchase) {
  const supabase = await createClient();
  const userId = (await supabase.auth.getUser())?.data?.user?.id;
  if (!userId) {
    // TODO: error state;
    return;
  }

  const { error } = await supabase
    .from('Purchases')
    .upsert({
      ...purchase,
      user_id: userId
    });

  // TODO: do something with the error

  revalidatePath('/purchases');
  redirect('/purchases');
}

export async function deletePurchase(purchase: Purchase) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('Purchases')
    .delete()
    .match({ id: parseInt(purchase.id || '') });

  // TODO: do something with the error

  revalidatePath('/purchases');
}
