import ProjectItem from "./ProjectItem";
import { IProject } from "../interfaces";

type Props = {
  items: IProject[];
};

export const Project = ({ items }: Props) => (
  <div className="project">
    {items.map((item, key) => (
      <ProjectItem key={key} data={item} />
    ))}
  </div>
);
