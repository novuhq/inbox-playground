const API_URL = 'https://api.github.com/repos/novuhq/novu';

interface GitHubRepoData {
  stargazers_count: number;
}

const getGithubStars = async (): Promise<number> => {
  const response = await fetch(API_URL, { next: { revalidate: 60 * 60 * 12 } });
  if (response.status >= 400) {
    throw new Error('Error fetching GitHub stars');
  }
  const json: GitHubRepoData = await response.json();
  return json.stargazers_count;
};


export default getGithubStars;
