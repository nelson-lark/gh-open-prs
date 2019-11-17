import Cookies from "js-cookie";

import { Settings, PartialSettings } from "../types";
import { getPartialSettings } from "../utils/settings";

enum COOKIE_KEYS {
  API_TOKEN = "pr_tracker_api_token",
  REPOS = "pr_tracker_repos",
  ORG_NAME = "pr_tracker_org_name"
}

enum LOCAL_STORAGE_KEYS {
  LABEL_BY_REPO = "pr_tracker_label_by_repo"
}

export function getSettings(): PartialSettings | {} {
  if (process.browser) {
    const apiToken = Cookies.get(COOKIE_KEYS.API_TOKEN);
    const orgName = Cookies.get(COOKIE_KEYS.ORG_NAME);
    const repos = Cookies.get(COOKIE_KEYS.REPOS);
    const filteredLabelsByRepoId = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.LABEL_BY_REPO) || "{}"
    );

    return { apiToken, orgName, repos, filteredLabelsByRepoId };
  }
  return {};
}

export function setSettings(settings: Settings) {
  if (process.browser) {
    const { apiToken, repos, orgName } = getPartialSettings(settings);

    Cookies.set(COOKIE_KEYS.API_TOKEN, apiToken);
    Cookies.set(COOKIE_KEYS.REPOS, repos);
    Cookies.set(COOKIE_KEYS.ORG_NAME, orgName);
  }
}

export function setLabelsByRepo(labelsByRepo: { [id: string]: string[] }) {
  if (process.browser) {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.LABEL_BY_REPO,
      JSON.stringify(labelsByRepo)
    );
  }
}
