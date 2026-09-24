/** @type {import('next').NextConfig} */
const nextConfig = {
  // A stray package-lock.json in the user profile directory makes Next infer
  // the wrong workspace root; pin it to this project.
  outputFileTracingRoot: import.meta.dirname,
};
export default nextConfig;
