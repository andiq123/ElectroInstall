import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "";
const databaseURL =
  process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL?.trim() ||
  (projectId ? `https://${projectId}-default-rtdb.firebaseio.com` : "");

const firebaseClientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
  ...(databaseURL ? { databaseURL } : {}),
};

const hasFirebaseConfig =
  Boolean(firebaseClientConfig.apiKey) &&
  Boolean(firebaseClientConfig.authDomain) &&
  Boolean(firebaseClientConfig.projectId) &&
  Boolean(firebaseClientConfig.appId);

export const firebaseClientApp = hasFirebaseConfig
  ? getApps().length > 0
    ? getApps()[0]!
    : initializeApp(firebaseClientConfig)
  : null;

export const firebaseAuth = firebaseClientApp ? getAuth(firebaseClientApp) : null;

