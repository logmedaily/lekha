const { Octokit } = require("@octokit/rest");

const token = process.env.PAT;
const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');

const octokit = new Octokit({ auth: token });

async function applyProtection(branch) {
    await octokit.repos.updateBranchProtection({
        owner,
        repo,
        branch,
        required_status_checks: {
            strict: true,
            contexts: [] // Add required status checks if needed
        },
        enforce_admins: true,
        required_pull_request_reviews: {
            dismissal_restrictions: {},
            dismiss_stale_reviews: true,
            require_code_owner_reviews: true,
            required_approving_review_count: 1 // At least one approval required
        },
        restrictions: {
            users: [owner], // Only allow the owner to push
            teams: [] // You can specify teams here if needed
        }
    });
    console.log(`Branch protection applied to ${branch}`);
}

['dev', 'uat', 'main'].forEach(applyProtection);
