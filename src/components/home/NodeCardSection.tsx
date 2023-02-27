import { Node } from '@/props/Node';
import { Card } from 'flowbite-react';
import { FC } from 'react';

type Props = {
	nodesValue: Map<string, number>;
	node: Node;
};

const NodeCardSection: FC<Props> = ({
	nodesValue,
	node,
}) => {

  return (
    <div>
      <Card href="#">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {node.coin}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {nodesValue.get(node.coin)} USD
        </p>
      </Card>
    </div>
  )
};

export default NodeCardSection;
