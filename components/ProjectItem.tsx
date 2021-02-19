import Link from "next/link";
import { PencilSVG, DataSVG } from "@/icons";
import { IProject } from "../interfaces";

type Props = {
  data: IProject;
};

const ProjectItem = ({ data }: Props) => (
  <div className="project__container">
    <div className="project__element">
      <DataSVG />
      <span>{data.name}</span>
    </div>
    <div>
      <Link href={`/?action=edit&id=${data.id}`}>
        <div className="project__icon">
          <PencilSVG />
        </div>
      </Link>
    </div>
  </div>
);

export default ProjectItem;
