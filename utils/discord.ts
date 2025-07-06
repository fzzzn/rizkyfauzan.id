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
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: DiscordActivity[];
}

export interface DiscordResponse {
  success: boolean;
  data: DiscordUser;
}

export const fetchDiscordStatus = async (
  userId: string
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
    console.error("Failed to fetch Discord status:", error);
    return null;
  }
};

export const getDiscordStatusColor = (status: string): string => {
  switch (status) {
    case "online":
      return "bg-green-500";
    case "idle":
      return "bg-yellow-500";
    case "dnd":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
};

export const getDiscordStatusText = (status: string): string => {
  switch (status) {
    case "online":
      return "Online";
    case "idle":
      return "Idle";
    case "dnd":
      return "Do Not Disturb";
    default:
      return "Offline";
  }
};

export const getActivityType = (type: number): string => {
  switch (type) {
    case 0:
      return "Playing";
    case 1:
      return "Streaming";
    case 2:
      return "Listening to";
    case 3:
      return "Watching";
    case 4:
      return "Custom";
    case 5:
      return "Competing in";
    default:
      return "Activity";
  }
};

export const formatActivity = (activity: DiscordActivity): string => {
  if (!activity) return "";

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
  activities: DiscordActivity[]
): DiscordActivity | null => {
  if (!activities || activities.length === 0) return null;

  // Prioritize non-custom activities
  const nonCustom = activities.find((a) => a.type !== 4);
  return nonCustom || activities[0];
};

export const getDiscordStatusBadgeClasses = (status: string): string => {
  const baseClasses = "text-xs px-2 py-1 rounded-full border font-medium";

  switch (status) {
    case "online":
      return `${baseClasses} bg-white border-green-500 text-green-700`;
    case "idle":
      return `${baseClasses} bg-white border-yellow-500 text-yellow-700`;
    case "dnd":
      return `${baseClasses} bg-white border-red-500 text-red-700`;
    default:
      return `${baseClasses} bg-white border-gray-300 text-gray-700`;
  }
};

export const copyDiscordUsername = async (
  username: string
): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(username);
    return true;
  } catch (error) {
    console.error("Failed to copy Discord username:", error);
    return false;
  }
};
