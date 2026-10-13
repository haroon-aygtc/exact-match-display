<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Landing page structure
- Implement added product sections as self-contained components composed by the index route, reusing the global typography and semantic tokens so subsequent sections remain consistent.
- Use the shared Button component for section actions and data-driven arrays for repeated feature rows to keep controls and layout reusable.
