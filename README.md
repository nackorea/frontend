# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


1. 해결방법
cd /Users/kb01-alexkr9173/WORK/NAC_KOREA
npm create vite@5.2.0 frontend -- --template react
cd frontend
npm install
npm install lucide-react
npm run dev

2. 해결방법 2
nvm install 22
nvm use 22
node -v   # v22.x.x 확인

3. nvm이 없는 경우 먼저 설치
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.zshrc    # 또는 source ~/.bash_profile
nvm install 22
nvm use 22

cd /Users/kb01-alexkr9173/WORK/NAC_KOREA
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install lucide-react
npm run dev