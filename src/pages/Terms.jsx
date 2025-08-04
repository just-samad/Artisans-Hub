import React from 'react';
import './Terms.css';

const TermsPage = () => {
  return (
    <div className="terms-wrapper">
      <h1>Terms & Services</h1>
      <p className="updated">Last Updated: August 2, 2025</p>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using Artisan Hub, you agree to comply with and be bound by these Terms and all applicable laws and regulations.
          If you do not agree, please do not use the platform.
        </p>
      </section>

      <section>
        <h2>2. User Responsibilities</h2>
        <p>
          Users must provide accurate information, keep credentials secure, and respect all community guidelines when using Artisan Hub.
        </p>
      </section>

      <section>
        <h2>3. Artisan Verification</h2>
        <p>
          Artisan Hub may verify artisan identities using uploaded ID numbers, but does not guarantee perfection. We encourage users to still apply discretion.
        </p>
      </section>

      <section>
        <h2>4. Payment & Services</h2>
        <p>
          Payments, where applicable, must be agreed upon between the client and the artisan. Artisan Hub is not responsible for private transactions unless managed via in-app payment integration.
        </p>
      </section>

      <section>
        <h2>5. Account Termination</h2>
        <p>
          We reserve the right to suspend or delete any account that violates our terms, including fraudulent identities, abuse, or misconduct.
        </p>
      </section>

      <section>
        <h2>6. Privacy & Data</h2>
        <p>
          We respect your privacy. Your information is stored securely and only used to improve platform experience. Read our full <strong>Privacy Policy</strong> for more.
        </p>
      </section>

      <section>
        <h2>7. Limitation of Liability</h2>
        <p>
          Artisan Hub is not liable for any direct or indirect damages resulting from use of the platform, including disputes between users.
        </p>
      </section>

      <section>
        <h2>8. Changes to Terms</h2>
        <p>
          We may update these Terms occasionally. Continued use of the platform after changes means you accept the revised Terms.
        </p>
      </section>

      <p className="bottom-note">If you have questions about these terms, please contact support via your profile or visit the Support page.</p>
    </div>
  );
};

export default TermsPage;
