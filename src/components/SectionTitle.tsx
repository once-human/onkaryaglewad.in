export default function SectionTitle({
  title,
  subTitle,
}: {
  title: string;
  subTitle?: string;
}) {
  return (
    <div className="mb-8 text-center md:mb-12">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
        {title}
      </h1>
      {subTitle && (
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 sm:mt-4">
          {subTitle}
        </p>
      )}
    </div>
  );
}
