import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/ros2-humanoid-book/__docusaurus/debug',
    component: ComponentCreator('/ros2-humanoid-book/__docusaurus/debug', '52c'),
    exact: true
  },
  {
    path: '/ros2-humanoid-book/__docusaurus/debug/config',
    component: ComponentCreator('/ros2-humanoid-book/__docusaurus/debug/config', '588'),
    exact: true
  },
  {
    path: '/ros2-humanoid-book/__docusaurus/debug/content',
    component: ComponentCreator('/ros2-humanoid-book/__docusaurus/debug/content', 'c68'),
    exact: true
  },
  {
    path: '/ros2-humanoid-book/__docusaurus/debug/globalData',
    component: ComponentCreator('/ros2-humanoid-book/__docusaurus/debug/globalData', '0de'),
    exact: true
  },
  {
    path: '/ros2-humanoid-book/__docusaurus/debug/metadata',
    component: ComponentCreator('/ros2-humanoid-book/__docusaurus/debug/metadata', '385'),
    exact: true
  },
  {
    path: '/ros2-humanoid-book/__docusaurus/debug/registry',
    component: ComponentCreator('/ros2-humanoid-book/__docusaurus/debug/registry', '9c4'),
    exact: true
  },
  {
    path: '/ros2-humanoid-book/__docusaurus/debug/routes',
    component: ComponentCreator('/ros2-humanoid-book/__docusaurus/debug/routes', '91b'),
    exact: true
  },
  {
    path: '/ros2-humanoid-book/chatbot',
    component: ComponentCreator('/ros2-humanoid-book/chatbot', '8fa'),
    exact: true
  },
  {
    path: '/ros2-humanoid-book/rag-chatbot',
    component: ComponentCreator('/ros2-humanoid-book/rag-chatbot', 'd9f'),
    exact: true
  },
  {
    path: '/ros2-humanoid-book/search',
    component: ComponentCreator('/ros2-humanoid-book/search', '16d'),
    exact: true
  },
  {
    path: '/ros2-humanoid-book/docs',
    component: ComponentCreator('/ros2-humanoid-book/docs', 'e68'),
    routes: [
      {
        path: '/ros2-humanoid-book/docs',
        component: ComponentCreator('/ros2-humanoid-book/docs', 'eda'),
        routes: [
          {
            path: '/ros2-humanoid-book/docs',
            component: ComponentCreator('/ros2-humanoid-book/docs', '888'),
            routes: [
              {
                path: '/ros2-humanoid-book/docs/chapter-template',
                component: ComponentCreator('/ros2-humanoid-book/docs/chapter-template', 'f85'),
                exact: true
              },
              {
                path: '/ros2-humanoid-book/docs/community/contribution-guide',
                component: ComponentCreator('/ros2-humanoid-book/docs/community/contribution-guide', '6f6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ros2-humanoid-book/docs/content-validation-process',
                component: ComponentCreator('/ros2-humanoid-book/docs/content-validation-process', 'eab'),
                exact: true
              },
              {
                path: '/ros2-humanoid-book/docs/modules/module-1-ros2/chapter-1-introduction-to-ros2',
                component: ComponentCreator('/ros2-humanoid-book/docs/modules/module-1-ros2/chapter-1-introduction-to-ros2', '6db'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ros2-humanoid-book/docs/modules/module-1-ros2/chapter-2-ros2-communication-python-agents',
                component: ComponentCreator('/ros2-humanoid-book/docs/modules/module-1-ros2/chapter-2-ros2-communication-python-agents', '037'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ros2-humanoid-book/docs/modules/module-1-ros2/chapter-3-urdf-humanoid-structure',
                component: ComponentCreator('/ros2-humanoid-book/docs/modules/module-1-ros2/chapter-3-urdf-humanoid-structure', '5fe'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ros2-humanoid-book/docs/modules/module-1-ros2/summary',
                component: ComponentCreator('/ros2-humanoid-book/docs/modules/module-1-ros2/summary', 'a41'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ros2-humanoid-book/docs/reference/glossary',
                component: ComponentCreator('/ros2-humanoid-book/docs/reference/glossary', '8b1'),
                exact: true
              },
              {
                path: '/ros2-humanoid-book/docs/reference/ros2-concepts/nodes-topics-services',
                component: ComponentCreator('/ros2-humanoid-book/docs/reference/ros2-concepts/nodes-topics-services', 'aa9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ros2-humanoid-book/docs/reference/ros2-concepts/rclpy-basics',
                component: ComponentCreator('/ros2-humanoid-book/docs/reference/ros2-concepts/rclpy-basics', 'a01'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ros2-humanoid-book/docs/reference/ros2-concepts/urdf-overview',
                component: ComponentCreator('/ros2-humanoid-book/docs/reference/ros2-concepts/urdf-overview', '474'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ros2-humanoid-book/docs/visual-assets-template',
                component: ComponentCreator('/ros2-humanoid-book/docs/visual-assets-template', '095'),
                exact: true
              },
              {
                path: '/ros2-humanoid-book/docs/writing-guidelines',
                component: ComponentCreator('/ros2-humanoid-book/docs/writing-guidelines', 'e16'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/ros2-humanoid-book/',
    component: ComponentCreator('/ros2-humanoid-book/', 'ba3'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
