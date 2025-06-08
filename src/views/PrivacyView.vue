<template>
  <section class="privacy-policy">
    <div class="container">
      <h1 class="title">Privacy Policy</h1>
      <p class="updated">Last Updated: May 27, 2025</p>

      <p>
        At Freebis, we value your privacy and are committed to protecting your personal information.
        This Privacy Policy outlines the types of information we collect, how we use it, and your rights regarding your
        data.
      </p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li><strong>Personal Information:</strong> Such as your name, email address, phone number, and company details
          when you contact us or fill out forms.</li>
        <li><strong>Usage Data:</strong> Information about how you interact with our website including pages visited,
          time spent, and other diagnostic data.</li>
        <li><strong>Cookies:</strong> Small data files used to improve user experience and analyze website performance.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To respond to inquiries and provide customer support.</li>
        <li>To improve our website and tailor content to user preferences.</li>
        <li>To communicate updates, offers, or services relevant to you.</li>
        <li>To comply with legal obligations and prevent fraudulent activities.</li>
      </ul>

      <h2>3. Sharing of Information</h2>
      <p>
        We do not sell or rent your personal data. Your information may only be shared with third-party services
        essential for operating our website, such as analytics tools or email services, and always under strict
        confidentiality agreements.
      </p>

      <h2>4. Data Security</h2>
      <p>
        We implement industry-standard security measures to protect your information, including encryption, secure
        servers, and access control. However, no method of transmission over the internet is 100% secure.
      </p>

      <h2>5. Your Rights</h2>
      <ul>
        <li>Access your personal information.</li>
        <li>Request correction of inaccurate data.</li>
        <li>Request deletion of your personal data (in certain cases).</li>
        <li>Opt-out of promotional communications.</li>
      </ul>

      <h2>6. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us using
        the information below:
      </p>

      <div class="contact-info">
        <div class="info-block">
          <h3>📧 Email</h3>
          <p>hello@freebis.com</p>
          <p>collaborate@freebis.com</p>
        </div>
        <div class="info-block">
          <h3>📞 Phone</h3>
          <p>+1 (212) 521-6273 (Office)</p>
          <p>+1 (800) 262-6126 (Support)</p>
        </div>
        <div class="info-block">
          <h3>🏢 Studio</h3>
          <p>Colfax Avenue</p>
          <p>Suite 200</p>
          <p>Colorado</p>
        </div>
        <div class="info-block">
          <h3>⏰ Hours</h3>
          <p>Monday–Friday: 9am – 6pm</p>
          <p>Saturday: 10am – 4pm</p>
          <p>Sunday: Closed</p>
        </div>
      </div>

      <h2>7. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated
        revision date.
        Continued use of our website after such changes constitutes your consent to the changes.
      </p>
    </div>
  </section>
</template>

<script setup>
// No JS needed currently
</script>

<style scoped>
.privacy-policy {
  padding: 3rem 1rem;
  background: #f9f9f9;
  color: #333;
  font-family: 'Inter', sans-serif;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

.title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #222;
}

.updated {
  font-size: 0.875rem;
  color: #888;
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.4rem;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  color: #222;
}

h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 0.25rem;
}

p {
  line-height: 1.7;
  margin-bottom: 1rem;
}

ul {
  padding-left: 1.2rem;
  margin-bottom: 1.5rem;
}

ul li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.contact-info {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.info-block p {
  margin: 0.25rem 0;
  color: #444;
}
</style>