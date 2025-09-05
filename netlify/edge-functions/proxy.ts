export default async (request: Request) => {
  const url = new URL(request.url);
  const domain = url.hostname;
  
  const domainMappings: Record<string, string> = {
    'pr.thanx.top': 'http://106.15.4.153:8085',
    'api.thanx.top': 'http://106.15.4.153:8086',
    'admin.thanx.top': 'http://106.15.4.153:8087'
  };

  const target = domainMappings[domain];
  
  if (!target) {
    return new Response('Domain not configured', { status: 404 });
  }

  const targetUrl = new URL(url.pathname + url.search, target);
  
  const response = await fetch(targetUrl.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.body
  });

  return new Response(response.body, {
    status: response.status,
    headers: response.headers
  });
};

export const config = {
  path: '/*'
};
