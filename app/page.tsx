import { DisclaimerSection } from './components/DisclaimerSection';
import { SearchBox } from './components/SearchBar';

export const dynamic = 'force-dynamic';

export default async function Index() {
  return (
    <div className='flex w-full flex-col items-center text-foreground'>
      <DisclaimerSection />
      <SearchBox />
    </div>
  );
}
