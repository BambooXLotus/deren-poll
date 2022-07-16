import { useRouter } from 'next/router';

import { trpc } from '../../utils/trpc';

export const QuestionContent: React.FC<{ id: string }> = ({ id }) => {
	const { data, isLoading, error } = trpc.useQuery(['questions.get-by-id', { id }]);

	if (isLoading) return <div>LOADING...</div>;

	if (!isLoading && !data) return <div>NOT FOUND</div>;

	return <div>{data?.question}</div>;
};

const QuestionPage = () => {
	const { query } = useRouter();
	const { id } = query;

	if (!id || typeof id !== 'string') return <div>NOT FOUND</div>;

	return <QuestionContent id={id}></QuestionContent>;
};

export default QuestionPage;
