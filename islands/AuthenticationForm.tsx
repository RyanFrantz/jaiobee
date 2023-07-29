export default function AuthenticationForm({ signup }) {
  return (
    <>
      {signup
        ? (
          <div class="signup-form">
            <form method="post" action="/api/signup">
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="jane@hireme.com"
                autocomplete="email"
                pattern="^[A-Za-z0-9._+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
                required
              />
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                autocomplete="new-password"
                minLength="12"
                required
              />
              <br />
              <button type="submit">Create Account</button>
            </form>
            <p>
              Already have an account? <a href="/login">Login here!</a>
            </p>
          </div>
        )
        : (
          <div class="login-form">
            <form method="post" action="/api/login">
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="jane@hireme.com"
                autocomplete="email"
                pattern="^[A-Za-z0-9._+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
                required
              />
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                required
              />
              <br />
              <button type="submit">Login</button>
            </form>
            <p>
              Don't have an account? <a href="/signup">Sign up here!</a>
            </p>
          </div>
        )}
    </>
  );
}
