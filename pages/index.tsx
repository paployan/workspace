import { useEffect } from 'react';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "@/store";
import { IProject } from "../interfaces";

import { Header, SimpleModal, Project } from "../components";

const IndexPage = () => {
  const projects = useSelector((state:IProject[]) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const router = useRouter();
  const { action } = router.query;

  return (
    <div>
      <Header />
      <Project items={projects} />
      <SimpleModal
        id={router.query.id}
        isOpen={!!action}
        onRequestClose={() => router.push("/")}
      />
    </div>
  );
};

export default IndexPage;
