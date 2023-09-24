import { User } from '@supabase/supabase-js';
import React from 'react';

export function useUser(supabase: any) {
  const [user, setUser] = React.useState<User>();
  const [loading, setLoading] = React.useState(true);

  const getUser = React.useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        throw error;
      }

      if (data) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  React.useEffect(() => {
    getUser();
  }, [getUser]);

  return { user, loading };
}
