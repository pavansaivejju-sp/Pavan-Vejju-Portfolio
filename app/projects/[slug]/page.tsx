import { notFound } from 'next/navigation';
import projectsData from '../../data/projects.json';
import ProjectDetails from './ProjectDetails';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projectsData.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData.find((projectItem) => projectItem.slug === slug);

  if (!project) {
    notFound();
  }
  return <ProjectDetails slug={slug} />;
}

