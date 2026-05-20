import { Link } from 'wouter';
import SEOHead from '../components/SEOHead';
import Layout from '../components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <SEOHead
        title="Page Not Found | Word Unscrambler"
        description="The page you are looking for could not be found. Return to Word Unscrambler."
      />
      <div className="text-center py-20">
        <div className="text-8xl font-black text-blue-100 mb-4">404</div>
        <h1 className="text-3xl font-black text-slate-800 mb-3">Page Not Found</h1>
        <p className="text-slate-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link href="/" className="btn-primary inline-block">← Back to Word Unscrambler</Link>
      </div>
    </Layout>
  );
}
