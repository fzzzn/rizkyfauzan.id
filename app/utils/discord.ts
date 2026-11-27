export interface DiscordActivity {
  id: string;
  name: string;
  type: number;
  details?: string;
  state?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
}

export interface DiscordUser {
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: DiscordActivity[];
}

export interface DiscordResponse {
  success: boolean;
  data: DiscordUser;
}

export const fetchDiscordStatus = async (
  userId: string,
): Promise<DiscordUser | null> => {
  try {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
    const data: DiscordResponse = await response.json();

    if (data.success) {
      return {
        discord_status: data.data.discord_status,
        activities: data.data.activities || [],
      };
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch Discord status:', error);
    return null;
  }
};

export const getDiscordStatusColor = (status: string): string => {
  switch (status) {
    case 'online':
      return 'bg-green-500';
    case 'idle':
      return 'bg-yellow-500';
    case 'dnd':
      return 'bg-red-500';
    default:
      return 'bg-gray-400';
  }
};

export const getDiscordStatusText = (status: string): string => {
  switch (status) {
    case 'online':
      return 'Online';
    case 'idle':
      return 'Idle';
    case 'dnd':
      return 'DND';
    default:
      return 'Offline';
  }
};

export const getActivityType = (type: number): string => {
  switch (type) {
    case 0:
      return 'Playing';
    case 1:
      return 'Streaming';
    case 2:
      return 'Listening to';
    case 3:
      return 'Watching';
    case 4:
      return '';
    case 5:
      return 'Competing in';
    default:
      return 'Activity';
  }
};

export const formatActivity = (activity: DiscordActivity): string => {
  if (!activity) return '';

  const type = getActivityType(activity.type);
  let text = `${type} ${activity.name}`;

  if (activity.details) {
    text += ` - ${activity.details}`;
  }

  if (activity.state && activity.state !== activity.details) {
    text += ` (${activity.state})`;
  }

  return text;
};

export const getPrimaryActivity = (
  activities: DiscordActivity[],
): DiscordActivity | null => {
  if (!activities || activities.length === 0) return null;

  // Prioritize non-custom activities
  const nonCustom = activities.find((a) => a.type !== 4);
  return nonCustom ?? activities[0] ?? null;
};

export const getDiscordStatusBadgeClasses = (status: string): string => {
  const baseClasses = 'text-xs font-medium px-2 py-0.5 rounded-xl border';

  switch (status) {
    case 'online':
      return `${baseClasses} bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-400`;
    case 'idle':
      return `${baseClasses} bg-amber-500/10 border-amber-500/40 text-amber-800 dark:text-amber-300`;
    case 'dnd':
      return `${baseClasses} bg-rose-500/10 border-rose-500/40 text-rose-700 dark:text-rose-400`;
    default:
      return `${baseClasses} bg-surface border-border text-muted`;
  }
};

export const copyDiscordUsername = async (
  username: string,
): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(username);
    return true;
  } catch (error) {
    console.error('Failed to copy Discord username:', error);
    return false;
  }
};
