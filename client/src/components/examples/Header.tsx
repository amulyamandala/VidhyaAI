import Header from '../Header';

export default function HeaderExample() {
  return (
    <div className="w-full">
      <Header />
      <div className="p-8">
        <p className="text-muted-foreground">Sample content below header to show sticky behavior</p>
      </div>
    </div>
  );
}