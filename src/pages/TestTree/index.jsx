import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useTranslation } from "react-i18next";
import { Row, Col } from "reactstrap";
import {
  UncontrolledTreeEnvironment,
  Tree,
  StaticTreeDataProvider,
} from "react-complex-tree";
import "react-complex-tree/lib/style-modern.css";

const items = {
  root: {
    index: "root",
    canMove: true,
    isFolder: true,
    children: ["child1", "child2"],
    data: "Root item",
    canRename: true,
  },
  child1: {
    index: "child1",
    canMove: true,
    isFolder: false,
    children: [],
    data: "Child item 1",
    canRename: true,
  },
  child2: {
    index: "child2",
    canMove: true,
    isFolder: false,
    children: [],
    data: "Child item 2",
    canRename: true,
  },
};

const TestTree = () => {
  document.title = " Projectstatus  |  Project Managment";

  const { t } = useTranslation();
  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title={t("Test Tree")} breadcrumbItem={t("tree")} />
        <Row>
          <Col className="border-2">
            <UncontrolledTreeEnvironment
              dataProvider={
                new StaticTreeDataProvider(items, (item, data) => ({
                  ...item,
                  data,
                }))
              }
              getItemTitle={(item) => item.data}
              viewState={{}}
            >
              <Tree treeId="tree-1" rootItem="root" treeLabel="Tree Example" />
            </UncontrolledTreeEnvironment>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TestTree;
