import { Role } from '../types';

const ACCOUNTS_KEY = 'alpha-dent.accounts';
const SESSION_KEY = 'alpha-dent.session';

export interface AuthAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: string;
}

export interface AuthSession {
  name: string;
  email: string;
  role: Role;
}

interface AuthResult {
  ok: boolean;
  message: string;
  session?: AuthSession;
}

export const DEMO_CREDENTIALS = [
  {
    role: 'patient' as Role,
    name: 'Patient Demo',
    email: 'patient@alphadent.demo',
    password: 'patient123',
  },
  {
    role: 'doctor' as Role,
    name: 'Doctor Demo',
    email: 'doctor@alphadent.demo',
    password: 'doctor123',
  },
];

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const buildSession = (account: AuthAccount): AuthSession => ({
  name: account.name,
  email: account.email,
  role: account.role,
});

const readAccounts = (): AuthAccount[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  const stored = window.localStorage.getItem(ACCOUNTS_KEY);
  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeAccounts = (accounts: AuthAccount[]) => {
  window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
};

export const ensureAuthSeeded = () => {
  if (typeof window === 'undefined') {
    return;
  }

  const storedAccounts = readAccounts();
  const merged = [...storedAccounts];

  DEMO_CREDENTIALS.forEach((demo, index) => {
    const exists = merged.some(
      (account) =>
        normalizeEmail(account.email) === normalizeEmail(demo.email) &&
        account.role === demo.role
    );

    if (!exists) {
      merged.push({
        id: `demo-${index + 1}`,
        name: demo.name,
        email: normalizeEmail(demo.email),
        password: demo.password,
        role: demo.role,
        createdAt: new Date().toISOString(),
      });
    }
  });

  if (merged.length !== storedAccounts.length) {
    writeAccounts(merged);
  }
};

export const getAuthSession = (): AuthSession | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = window.localStorage.getItem(SESSION_KEY);
  if (!stored) {
    return null;
  }

  try {
    const parsed = JSON.parse(stored);
    if (parsed?.email && parsed?.role) {
      return parsed as AuthSession;
    }
  } catch {
    return null;
  }

  return null;
};

const writeSession = (session: AuthSession) => {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const clearAuthSession = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
};

export const signIn = ({
  email,
  password,
  role,
}: {
  email: string;
  password: string;
  role: Role;
}): AuthResult => {
  ensureAuthSeeded();

  const normalizedEmail = normalizeEmail(email);
  const account = readAccounts().find(
    (entry) =>
      normalizeEmail(entry.email) === normalizedEmail &&
      entry.password === password &&
      entry.role === role
  );

  if (!account) {
    return {
      ok: false,
      message: 'Invalid email, password, or role selection.',
    };
  }

  const session = buildSession(account);
  writeSession(session);

  return {
    ok: true,
    message: 'Signed in successfully.',
    session,
  };
};

export const signUp = ({
  name,
  email,
  password,
  role,
}: {
  name: string;
  email: string;
  password: string;
  role: Role;
}): AuthResult => {
  ensureAuthSeeded();

  const normalizedEmail = normalizeEmail(email);
  const accounts = readAccounts();
  const existingAccount = accounts.find(
    (entry) => normalizeEmail(entry.email) === normalizedEmail
  );

  if (existingAccount) {
    return {
      ok: false,
      message: 'An account with this email already exists.',
    };
  }

  const account: AuthAccount = {
    id: `acct-${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    password,
    role,
    createdAt: new Date().toISOString(),
  };

  writeAccounts([...accounts, account]);

  const session = buildSession(account);
  writeSession(session);

  return {
    ok: true,
    message: 'Account created successfully.',
    session,
  };
};
