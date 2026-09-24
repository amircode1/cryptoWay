import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCategoriesQuery } from '../queries/useQuery';
import CategoryTable from '../components/CategoryTable';
import PageHeader from '../components/ui/PageHeader';

function CategoryPage() {
  const { data: categories = [], isLoading, isError, error } = useCategoriesQuery();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="w-full max-w-7xl mx-auto px-4 md:px-0 flex-1 mt-3 fade-in-up">
        <PageHeader
          title="Cryptocurrency Categories"
          subtitle="Cryptocurrencies can be categorized into several types based on their purpose and functionality. The main categories include coins like Bitcoin and Ethereum, which function as digital currencies, and tokens, which are used for specific platforms or utilities. Additionally, stablecoins aim to maintain a stable value, while privacy coins focus on enhanced transaction anonymity."
          loading={isLoading}
        />

        <hr className="w-full border-t-2 border-emerald-300 my-5" />

        <CategoryTable
          data={categories}
          totalPages={Math.ceil(categories.length / 100)}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
      </main>

      <Footer />
    </div>
  );
}

export default CategoryPage;
