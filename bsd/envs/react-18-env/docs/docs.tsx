import { DocsApp } from "@teambit/react.ui.docs-app";
import React from "react";
import { createRoot } from "react-dom/client";

/**
 * a reference to a provider function.
 * https://bit.cloud/teambit/docs/docs-template/~code/docs-template.tsx
 */

function DocsRoot({ componentId, docs, compositions, context }) {
  const rootElm = document.getElementById("root");
  const root = createRoot(rootElm!);
  root.render(
    <DocsApp
      componentId={componentId}
      docs={docs}
      compositions={compositions}
      context={context}
    />
  );
}

// For backward compatibility - can be removed end of 2022
DocsRoot.apiObject = true;

export default DocsRoot;
