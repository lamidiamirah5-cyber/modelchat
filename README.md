# ModelMix Chat

ModelMix is a static multi-model chatbot website. It opens directly to a Copilot-inspired chat screen with a Smart model pill, a Mixed mode, and a model guide.

## Publish it free with GitHub Pages

This project does not need a build step.

1. Create a new GitHub repository, for example `modelchat`.
2. Upload `index.html`, `styles.css`, `app.js`, `README.md`, and the `assets` folder.
3. Open the repository Settings.
4. Open Pages.
5. Under Build and deployment, choose Deploy from a branch.
6. Choose the `main` branch and `/root`.
7. Save.

GitHub will give you a free link like:

```text
https://your-github-name.github.io/modelchat/
```

## Subscriptions later

The pricing section is only a public website design right now. Real subscriptions need a backend so private API keys and payment secrets stay safe.

A good future setup:

- GitHub Pages hosts the public website for free.
- A small backend handles chat requests.
- Stripe Checkout handles subscriptions.
- The backend checks whether the user is Free, Plus, or Pro.
- Better plans can use newer or more expensive models.

Do not put OpenAI, Anthropic, Google, or Stripe secret keys directly in `app.js`.

## Files

- `index.html` - the website and app layout
- `styles.css` - the visual design and responsive layout
- `app.js` - demo chat behavior and model picker logic
- `assets/` - logo and model diagram

## Next upgrade

The current chat replies are demo responses. To make it fully real, connect the form submit handler in `app.js` to a backend API that safely calls OpenAI, Anthropic, Google, or a local model provider. Do not put private API keys directly in browser JavaScript.
