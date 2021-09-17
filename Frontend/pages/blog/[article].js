import Container from '../../components/Container'

export default function article(props) {
  console.log(props);
  return (
    <>
    <Container/>
    <div className="container px-4 pt-5">
      <h3 className="text-center-mb-5">{props.article.username} a écrit : </h3>
      <p className="mt-5">{props.article.body} </p>
    </div>
    </>
  );
}

export async function getStaticProps(context) {
  const id = context.params.article;
  const data = await fetch(`http://localhost:8080/api/messages/${id}`);
  const article = await data.json();

  return {
    props: {
      article,
    },
  };
}

export async function getStaticPaths() {
  const data = await fetch("http://localhost:8080/api/messages");
  const articles = await data.json();
  const paths = articles.map((item) => ({
    params: { article: item.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
}
