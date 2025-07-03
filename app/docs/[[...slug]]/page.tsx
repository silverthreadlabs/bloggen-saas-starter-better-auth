import {
  type ComponentProps,
  type FC,
  type ReactElement,
  type ReactNode,
} from 'react';
import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Mdx, { createRelativeLink } from 'fumadocs-ui/mdx';
import { Mermaid } from '@/components/ui/mermaid';
import { UiOverview } from '@/components/ui-overview';
import { Callout } from 'fumadocs-ui/components/callout';
import { Wrapper } from '@/components/ui/wrapper';
import { getPageTreePeers } from 'fumadocs-core/server';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { AutoTypeTable } from 'fumadocs-typescript/ui';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import { getMDXComponents } from '@/mdx-components';
import { Banner } from 'fumadocs-ui/components/banner';
import { Rate } from '@/components/rate';
import { onRateAction, owner, repo } from '@/lib/github';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import * as Twoslash from 'fumadocs-twoslash/ui';
import {
  PageArticle,
  PageBreadcrumb,
  PageFooter,
  PageLastUpdate,
  PageRoot,
  PageTOC,
  PageTOCItems,
  PageTOCPopover,
  PageTOCPopoverContent,
  PageTOCPopoverItems,
  PageTOCPopoverTrigger,
  PageTOCTitle,
} from 'fumadocs-ui/layouts/docs/page';
import path from 'path';
import { createGenerator } from 'fumadocs-typescript';


const generator = createGenerator();

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();


  
  // const preview = page.data.preview;
  const MDXContent = page.data.body;

  return (
    <PageRoot
    toc={{
      toc: page.data.toc,
      single: false,
    }}
  >
    {page.data.toc.length > 0 && (
      <PageTOCPopover>
        <PageTOCPopoverTrigger />
        <PageTOCPopoverContent>
          <PageTOCPopoverItems />
        </PageTOCPopoverContent>
      </PageTOCPopover>
    )}
    <PageArticle>
      <PageBreadcrumb />
      <h1 className="text-3xl font-semibold">{page.data.title}</h1>
      <p className="text-lg text-fd-muted-foreground">
        {page.data.description}
      </p>
      <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
        {/* <LLMCopyButton slug={params.slug} /> */}
        {/* <ViewOptions
            markdownUrl={`${page.url}.mdx`}
            githubUrl={`https://github.com/${owner}/${repo}/blob/dev/apps/docs/content/docs/${page.path}`}
          /> */}
      </div>
      <div className="prose flex-1 text-fd-foreground/80">
        {/* {preview ? <PreviewRenderer preview={preview} /> : null} */}

        <MDXContent
          components={getMDXComponents({
            ...Twoslash,
            a: ({ href, ...props }) => {
              const found = source.getPageByHref(href ?? '', {
                dir: path.dirname(page.path),
              });

              if (!found) return <Link href={href} {...props} />;

              return (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Link
                      href={
                        found.hash
                          ? `${found.page.url}#${found.hash}`
                          : found.page.url
                      }
                      {...props}
                    />
                  </HoverCardTrigger>
                  <HoverCardContent className="text-sm">
                    <p className="font-medium">{found.page.data.title}</p>
                    <p className="text-fd-muted-foreground">
                      {found.page.data.description}
                    </p>
                  </HoverCardContent>
                </HoverCard>
              );
            },
            Banner,
            Mermaid,
            TypeTable,
            AutoTypeTable: (props) => (
              <AutoTypeTable generator={generator} {...props} />
            ),
            Wrapper,
            blockquote: Callout as unknown as FC<
              ComponentProps<'blockquote'>
            >,
            // APIPage: (props) => (
            //   <APIPage {...openapi.getAPIPageProps(props)} />
            // ),
            DocsCategory: ({ url }) => {
              return <DocsCategory url={url ?? page.url} />;
            },
            UiOverview,

            // ...(await import('@/content/docs/ui/components/tabs.client')),
            // ...(await import('@/content/docs/ui/theme.client')),
          })}
        />
        {/* {page.data.index ? <DocsCategory url={page.url} /> : null} */}
      </div>
      <Rate onRateAction={onRateAction} />
      {page.data.lastModified && <PageLastUpdate date={page.data.lastModified} />}
      <PageFooter />
    </PageArticle>
    {page.data.toc.length > 0 && (
      <PageTOC>
        <PageTOCTitle />
        <PageTOCItems variant="clerk" />
      </PageTOC>
    )}
  </PageRoot>
  );
}

function DocsCategory({ url }: { url: string }) {
  return (
    <Cards>
      {getPageTreePeers(source.pageTree, url).map((peer) => (
        <Card key={peer.url} title={peer.name} href={peer.url}>
          {peer.description}
        </Card>
      ))}
    </Cards>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
