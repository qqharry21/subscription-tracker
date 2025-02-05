export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="grid w-full place-items-center">{children}</div>;
}
