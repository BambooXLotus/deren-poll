import { prisma } from '../db/client';
import { trpc } from '../utils/trpc';

const Home = (props: any) => {
	const { data, isLoading } = trpc.useQuery(['hello']);

	if (isLoading || !data) return <div>Loading...</div>;

	return (
		<>
			<h1 className='text-3xl font-bold underline'>Hello World!</h1>
			<div>{props.questions}</div>
			<div>{data.greeting}</div>
		</>
	);
};

export default Home;

export const getServerSideProps = async () => {
	const questions = await prisma.pollQuestion.findMany();

	return {
		props: {
			questions: JSON.stringify(questions),
		},
	};
};
