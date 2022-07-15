import { prisma } from '../db/client';

const Home = (props: any) => {
	return (
		<>
			<h1 className='text-3xl font-bold underline'>Hello World!</h1>
			<div>{props.questions}</div>
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
