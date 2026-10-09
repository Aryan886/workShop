# Devfolio Git and GitHub workshop

Build a small portfolio while practising **fork → clone → branch → commit → push → pull request**. During class, you will open one PR, then add a second commit to update that same PR. Your PR can remain open while the facilitator reviews the class's contributions.

The website is plain HTML, CSS, and JavaScript. Open an HTML file directly in your browser; no packages, build step, or server are needed.

## Which files should I use?

| Location | Purpose |
| --- | --- |
| Root `index.html` | Example portfolio with sample projects |
| `students/template/` | Four-file starting point to copy |
| `students/YOUR-USERNAME/` | Your personal portfolio folder |
| `profile.js` in your folder | Your name, about text, skills, projects, and links |
| `index.html` in your folder | Page structure |
| `style.css` in your folder | Colours and layout |
| `script.js` in your folder | Displays profile data and handles the theme button |
| `data/featuredStudents.js` | Facilitator's local conflict exercise; not loaded by the website |
| [FACILITATOR.md](FACILITATOR.md) | Full workshop script and conflict walkthrough |

Each personal folder owns its four files. This intentional duplication makes student edits independent. Edit your own folder and leave the root example, template, and classmates' folders alone.

## Before starting

Install Git and a code editor, sign in to GitHub, and get the original workshop repository link. You will push to your own fork; no collaborator invitation is required.

Replace `WORKSHOP-OWNER` in these examples with the facilitator's GitHub account or organisation. Replace every `YOUR-USERNAME` with your own GitHub username. Use your username as your folder name so it is unique in the class.

If your fork has a different repository name, use the actual name in its URL.

## 1. Fork on GitHub

Open the original workshop repository and click **Fork**. Choose your personal account as owner and create the fork. If you already made a fork for this workshop, use it.

Check that the repository URL now belongs to your account. In that fork, choose **Code → HTTPS** and copy the URL.

Forking makes your copy on GitHub. Cloning is the next step: getting a local copy onto your computer.

## 2. Clone your fork

Open a terminal in a parent folder where a new workshop folder can be created:

```sh
git clone https://github.com/YOUR-USERNAME/devfolio-workshop.git
cd devfolio-workshop
git remote -v
git status
```

Both `origin` lines should point to **your account's fork**, not the facilitator's repository. Git status should show main and a clean working tree.

Set your commit identity for this repository:

```sh
git config user.name "Your Name"
git config user.email "YOUR-COMMIT-EMAIL"
```

Use your chosen commit email or the exact GitHub private commit email from your account settings. These commands identify your commits; they do not log you in to GitHub.

Open the cloned folder in your code editor. If you already have a clone, inspect its remotes instead of creating another copy inside it.

## 3. Create a branch and personalise your portfolio

```sh
git switch main
git switch -c feature/YOUR-USERNAME
git branch --show-current
```

Copy the whole `students/template` folder to `students/YOUR-USERNAME` using your editor or file manager.

Edit your folder's `profile.js`: name, role, tagline, about, and skills. Keep the quotes, commas, and brackets. Double-click your folder's `index.html` to check the page. Save changes and refresh the browser.

## 4. Inspect, commit, and push

```sh
git status
git add students/YOUR-USERNAME
git diff --staged
git commit -m "Add my portfolio profile"
git log --oneline -3
git push -u origin feature/YOUR-USERNAME
```

Your new folder is initially untracked, so `git diff` alone will not show it. Staging the folder lets `git diff --staged` show exactly what you are committing. Only your own four files should be included. Press `q` if a diff or log opens in a scrolling view.

Open your fork on GitHub, select your feature branch, and check your folder is present.

## 5. Open one PR to the original

Open the **original** repository, choose **Pull requests → New pull request**, and use **compare across forks** if shown.

| Selector | Choose |
| --- | --- |
| Base repository | `WORKSHOP-OWNER/devfolio-workshop` |
| Base branch | `main` |
| Head repository / head fork | `YOUR-USERNAME/devfolio-workshop` |
| Compare branch | `feature/YOUR-USERNAME` |

Inspect the diff, then create the PR. Suggested title: `Add YOUR-USERNAME portfolio`. Describe your changes and how you checked the page. Save the PR URL.

Keep this PR open for the next step. Do not wait for it to merge.

## 6. Add projects to the same branch and PR

```sh
git branch --show-current
```

You should still be on `feature/YOUR-USERNAME`.

In your own `profile.js`, add a comma after the `skills` array. Insert these fields before the closing `};`:

```js
  projects: [
    {
      name: "My first portfolio",
      description: "A portfolio built while learning Git and GitHub.",
      tech: ["HTML", "CSS", "JavaScript"],
      link: ""
    }
  ],
  github: "",
  linkedin: "",
  email: ""
```

Use your full `https://github.com/YOUR-USERNAME` URL for github. Other links can stay blank. Email is optional and anything committed here is public. Replace sample project text with your actual work; this workshop portfolio counts.

Save, refresh, and check the project card. Then:

```sh
git diff
git add students/YOUR-USERNAME/profile.js
git diff --staged
git commit -m "Add projects and contact links"
git push
```

The earlier `-u` set the destination for this branch. Your existing PR updates automatically. Reload it and check both commits and the new fields. Update its description with what you tested.

Do not create another PR for this second commit. If your PR was already merged unexpectedly, ask the facilitator and use the after-merge route instead.

## 7. Review a neighbour's PR

Exchange PR URLs. Check that only their personal folder changed and leave one useful comment about the diff or something you actually tested. You can comment without being a collaborator. The maintainer decides when to merge.

For a large class, your PR may be reviewed after the session. A correct open PR with your two commits is a successful workshop outcome. While it is open, keep your local portfolio on its feature branch.

## 8. After your PR is merged: sync, pull, and start a new change

Wait until your PR is marked **Merged** in the original repository.

On GitHub, open **your fork**, select `main`, and click **Sync fork → Update branch**. Then, with your local changes committed:

```sh
git status
git switch main
git pull --ff-only origin main
git switch -c feature/YOUR-USERNAME-about
```

Edit one sentence in your own about text. Check the page, then:

```sh
git diff
git add students/YOUR-USERNAME/profile.js
git commit -m "Improve my about section"
git push -u origin feature/YOUR-USERNAME-about
```

Open a new PR to the original main, using the same base/head repository choices and this new compare branch. This is follow-up practice, not a requirement to finish during class.

**Why sync first?** Origin is your fork. GitHub's Sync fork brings original-main changes into your fork's main. The pull brings them onto your laptop. Pulling an outdated fork alone does not fetch changes from the original.

Keep personal edits on feature branches, not main. If syncing or fast-forwarding fails, ask for help before discarding changes or forcing anything.

## Quick concepts

| Action | What it changes |
| --- | --- |
| Fork | Creates your repository copy on GitHub |
| Clone | Creates a local copy with Git history |
| Branch | Gives a change its own line of work |
| Save in your editor | Changes working files |
| Add | Selects changes for the next commit |
| Commit | Records selected changes locally |
| Push to origin | Uploads commits to your fork |
| PR | Proposes a branch's changes to the original |
| Maintainer merge | Incorporates the accepted PR into the original |
| Sync fork, then pull | Updates your fork, then your laptop |

## How the JavaScript works

`profile.js` defines one object. HTML loads it before `script.js` using ordinary deferred scripts, so double-clicking HTML works. The script uses `textContent` for text and `for...of` loops for skills and projects. A small function adds valid web links. A click listener toggles the dark theme, which resets when you refresh.

Empty project lists show a coming-soon message. Empty links are hidden. Web links need full http/https URLs; email uses only an email address. “Email me” opens the visitor's configured email app, not a backend service.

## Checks and common fixes

- Name not updated: save, refresh, and check you opened your own folder's HTML.
- JavaScript error: check quotes, commas, and brackets, especially the comma after skills.
- New files missing from diff: stage your folder, then use `git diff --staged`.
- Push denied: check `git remote -v` points to your fork and sign-in uses your account.
- PR has no changes: confirm the push succeeded and check all four base/head selectors.
- Portfolio absent on main: if your PR is pending, return to its feature branch with a clean working tree.
- Wrong file staged: `git restore --staged FILE-NAME` keeps the edit but removes it from staging.
- Unsure about anything: run `git status` and show the result to a helper.

Before submitting, check the page at phone width, both theme states, and any links you added. Blank skills or projects should remain usable. Use Tab to reach the theme button and press Enter to test it.

References: [fork PRs](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request-from-a-fork) and [syncing a fork](https://docs.github.com/en/pull-requests/how-tos/work-with-forks/syncing-a-fork).
