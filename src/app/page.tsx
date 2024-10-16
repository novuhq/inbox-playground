import AppContainer from "./components/layout/AppContainer";

import { Providers } from "./providers";

export default function Home() {
  return (
    <Providers>
      <AppContainer />
    </Providers>
  );
}
