/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button
} from "shards-react";

import PageTitle from "../components/common/PageTitle";

class BlogPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // First list of posts.
      PostsListOne: [
        {
          backgroundImage: require("../images/content-management/1.jpeg"),
          category: "Business",
          categoryTheme: "dark",
          author: "Anna Kunis",
          authorAvatar: require("../images/avatars/1.jpg"),
          title: "Conduct at an replied removal an amongst",
          body:
            "However venture pursuit he am mr cordial. Forming musical am hearing studied be luckily. But in for determine what would see...",
          date: "28 February 2019"
        },
        {
          backgroundImage: require("../images/content-management/2.jpeg"),
          category: "Travel",
          categoryTheme: "info",
          author: "James Jamerson",
          authorAvatar: require("../images/avatars/2.jpg"),
          title: "Off tears are day blind smile alone had ready",
          body:
            "Is at purse tried jokes china ready decay an. Small its shy way had woody downs power. To denoting admitted speaking learning my...",
          date: "29 February 2019"
        },
        {
          backgroundImage: require("../images/content-management/3.jpeg"),
          category: "Technology",
          categoryTheme: "royal-blue",
          author: "Jimmy Jackson",
          authorAvatar: require("../images/avatars/2.jpg"),
          title: "Difficult in delivered extensive at direction",
          body:
            "Is at purse tried jokes china ready decay an. Small its shy way had woody downs power. To denoting admitted speaking learning my...",
          date: "29 February 2019"
        },
        {
          backgroundImage: require("../images/content-management/4.jpeg"),
          category: "Business",
          categoryTheme: "warning",
          author: "John James",
          authorAvatar: require("../images/avatars/3.jpg"),
          title: "It so numerous if he may outlived disposal",
          body:
            "How but sons mrs lady when. Her especially are unpleasant out alteration continuing unreserved ready road market resolution...",
          date: "29 February 2019"
        },
        {
          backgroundImage: require("../images/content-management/3.jpeg"),
          category: "Technology",
          categoryTheme: "royal-blue",
          author: "Jimmy Jackson",
          authorAvatar: require("../images/avatars/2.jpg"),
          title: "Difficult in delivered extensive at direction",
          body:
            "Is at purse tried jokes china ready decay an. Small its shy way had woody downs power. To denoting admitted speaking learning my...",
          date: "29 February 2019"
        }
      ]
    };
  }

  render() {
    const { PostsListOne } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Meus Carros"
            subtitle="Lista com todos os carros"
            className="text-sm-left"
          />
        </Row>

        {/* Third Row of Posts */}
        <Row>
          {PostsListOne.map((post, idx) => (
            <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
              <Card small className="card-post card-post--1">
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url(${post.backgroundImage})` }}
                >
                  <Badge
                    pill
                    className={`card-post__category bg-${post.categoryTheme}`}
                  >
                    {post.category}
                  </Badge>
                </div>
                <CardBody>
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text text-muted">{post.body}</p>
                </CardBody>
                <CardFooter className="border-top d-flex">
                  <div className="my-auto ml-auto">
                    <Button className="mr-1" size="sm" theme="danger">
                      <i className="fas fa-trash-alt mr-1" /> Remover
                    </Button>

                    <Button size="sm" theme="white">
                      <i className="fas fa-edit mr-1" /> Editar
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default BlogPosts;
