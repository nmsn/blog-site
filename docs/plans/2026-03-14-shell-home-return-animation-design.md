# Shell To Home Return Animation Design

## Goal

When the user clicks the sidebar logo, the return animation should begin immediately in the current shell view:

- the dark sidebar background expands to cover the full screen
- the logo moves from the top-left corner to the center
- the logo scales up to the homepage size
- the right content area fades out
- routing to `/` happens only after the in-shell animation finishes

## Chosen Approach

Use a shell-local exit animation as the primary return transition.

The shell owns the full visual motion. The homepage should not replay another return animation after mount. Instead, it should render its normal resting state once routing completes.

## Why

This avoids the previous split animation problem where shell and home both tried to animate the same transition. It also makes the interaction feel immediate because the animation starts at click time instead of after navigation.

## Implementation Notes

- Add an `exiting` shell mode.
- Animate the sidebar container width from the fixed sidebar width to full width.
- Promote the shell logo into an animatable layer that can move toward the center and scale up.
- Fade the shell nav and right content out early in the exit.
- Keep using `home-entry` as a handoff marker, but only to suppress duplicate animation on the home page.
