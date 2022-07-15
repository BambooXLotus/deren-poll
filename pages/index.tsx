import { prisma } from '../db/client';
import { trpc } from '../utils/trpc';

const Home = () => {
	const { data, isLoading } = trpc.useQuery(['getAllQuestions']);

	if (isLoading || !data) return <div>Loading...</div>;

	console.log(data);

	return (
		<>
			<h1 className='text-3xl font-bold underline'>Hello World!</h1>
		</>
	);
};

export default Home;
