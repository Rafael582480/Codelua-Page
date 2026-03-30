import { APIyoutube } from "../shared/services/api-youtube";
import { Section } from "../components/section/section";

export default async function Home() {

  const courses = await APIyoutube.course.getAll().catch((error) => {
    console.error('Failed to fetch YouTube courses:', error);
    return [];
  });

  return (
    <div className="">
      <main className="bg-[var(--background-color)]">
        <Section
          items={
            courses.map(course => ({
              title: course.title,
              description: course.description,
              image: course.image,
              href: `/cursos/${course.id}`
            }))
          }
        />
      </main>
    </div>
  );
}
