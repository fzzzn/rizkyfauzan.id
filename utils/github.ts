export interface GitHubCommit {
  sha: string;
  commit: {
    committer: {
      date: string;
    };
  };
}

export const fetchLatestCommit = async (
  repo: string = "fzzzn/rizkyfauzan.id"
): Promise<{ date: string; sha: string } | null> => {
  try {
    const response = await $fetch<GitHubCommit[]>(
      `https://api.github.com/repos/${repo}/commits`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (response && response[0]) {
      return {
        date: response[0].commit.committer.date,
        sha: response[0].sha,
      };
    }

    return null;
  } catch (error) {
    console.error("Failed to fetch commit data:", error);
    return null;
  }
};

export const formatCommitDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getCommitUrl = (
  repo: string = "fzzzn/rizkyfauzan.id",
  sha: string
): string => {
  return `https://github.com/${repo}/commit/${sha}`;
};
