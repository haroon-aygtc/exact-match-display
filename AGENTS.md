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
- Compose the opening HeroSection before About and Core, using section anchors for navigation to existing content so the single-page experience remains extensible.
- Compose EngineeringSection after Core with data-driven principle articles; new section primitives are opt-in so shared-style additions never alter completed sections.
- Append the EngineeringAdviser as a self-contained section; stream AI Gateway Responses through a same-origin server route with server-only prompts and keys so visitor guidance needs no sign-in and existing sections remain unchanged.
- Store only the AI access circuit breaker in the service-only ai_feature_state table; visitor challenges remain transient, and blocked access requires an owner to restore service and clear the feature row before a fresh request.
