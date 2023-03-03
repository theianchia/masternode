import { FC } from 'react';
import { Modal } from 'flowbite-react';
import { Node } from '@/props/Node';
import { Coin } from '@/props/Coin';

type Props = {
	node: Node;
	coin: Coin;
	showModal: boolean;
	onClose: () => void;
};

const NodeModal: FC<Props> = ({ node, coin, showModal, onClose }) => {
	return (
    <>
      <Modal
        dismissible={true}
        show={showModal}
        onClose={onClose}
        className="bg-opacity-75"
      >
        <div>
          <Modal.Header>
            <div className="flex items-center">
              <img
                className="w-8 h-8 mr-3"
                src={coin.image.large}
                alt="Coin Logo"
              />
              <h5 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                {node.coin}
              </h5>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed">{coin.description.en}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <svg
              aria-hidden="true"
              className="w-3 h-3 mr-2"
              focusable="false"
              data-prefix="far"
              data-icon="question-circle"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"
              ></path>
            </svg>
            Learn more
          </Modal.Footer>
        </div>
      </Modal>
    </>
	);
};

export default NodeModal;
