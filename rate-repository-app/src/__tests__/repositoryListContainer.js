import React from 'react';
import { render } from '@testing-library/react-native';

import RepositoryListContainer from '../components/RepositoryListContainer';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };
      
      const container = render(<RepositoryListContainer repositories={repositories}/>);

      const abbreviate = value => value < 1000 ?
        value : `${Math.round(value/1000 * 10) / 10}k`;

      repositories.edges.forEach(r => {
        const i = repositories.edges.indexOf(r);
        const renderedRepo = repositories.edges[i].node;

        expect(container.getAllByTestId('fullName')[i]).toHaveTextContent(renderedRepo.fullName);
        expect(container.getAllByTestId('description')[i]).toHaveTextContent(renderedRepo.description);
        expect(container.getAllByTestId('language')[i]).toHaveTextContent(renderedRepo.language);
        expect(container.getAllByTestId('Stars')[i]).toHaveTextContent(abbreviate(renderedRepo.stargazersCount));
        expect(container.getAllByTestId('Forks')[i]).toHaveTextContent(abbreviate(renderedRepo.forksCount));
        expect(container.getAllByTestId('Reviews')[i]).toHaveTextContent(abbreviate(renderedRepo.reviewCount));
        expect(container.getAllByTestId('Rating')[i]).toHaveTextContent(abbreviate(renderedRepo.ratingAverage));
      });
    });
  });
});
