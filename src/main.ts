import "./css/index.scss";
import App from './App.svelte'

const app = new App({
  target: document.getElementById('svelte_app') as HTMLElement,
})

export default app
